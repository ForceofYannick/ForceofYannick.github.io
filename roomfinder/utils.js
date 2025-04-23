import * as THREE from 'three';
import { Building } from "./building.js";
import { Floor } from "./floor.js";
export function createTextLabelPlane(message, scale = 1) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    context.fillStyle = 'white';
    context.font = 'bold 700px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(1.5 * scale, 0.75 * scale);
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

export function createBuilding(name, floorData, position = { x: 0, y: 0, z: 0 }, scene, groundLvlHeight = 0, optionalX, optionalY) {
    const floors = [];

    for (let i = 0; i < floorData.length; i++) {
        const floorInfo = floorData[i];
        const floorName = floorInfo.name || i + 1;
        const roomList = floorInfo.rooms;

        var floor;
        if (optionalX !== undefined && optionalY !== undefined) {
            floor = new Floor(floorName, roomList, optionalX - 0.2, optionalY - 0.2);
        } else {
            floor = new Floor(floorName, roomList);
        }

        floor.getMesh().position.set(0, i - (floorData.length - 1) / 2, 0); // center
        floor.getMesh().renderOrder = 1;
        floors.push(floor);
    }

    var building;
    if (optionalX !== undefined && optionalY !== undefined) {
        building = new Building(name, floorData.length, floors, groundLvlHeight, optionalX, optionalY);
    } else {
        building = new Building(name, floorData.length, floors, groundLvlHeight);
    }
    const buildingMesh = building.getMesh();
    buildingMesh.position.set(position.x, position.y, position.z);
    buildingMesh.renderOrder = 0;

    scene.add(buildingMesh);

    for (const floor of floors) {
        scene.add(floor.getMesh());
        buildingMesh.add(floor.getMesh());
    }

    return { building, floors };
}

export function createBuildingOutline(x, y, z, groundY = 0) {
    const hx = x / 2;
    const hy = y / 2;
    const hz = z / 2;

    const points = [
        // vertical edges (4 edges)
        [-hx, -hy, -hz], [-hx, hy, -hz],
        [hx, -hy, -hz], [hx, hy, -hz],
        [hx, -hy, hz], [hx, hy, hz],
        [-hx, -hy, hz], [-hx, hy, hz],

        // bottom outline
        [-hx, -hy, -hz], [hx, -hy, -hz],
        [hx, -hy, -hz], [hx, -hy, hz],
        [hx, -hy, hz], [-hx, -hy, hz],
        [-hx, -hy, hz], [-hx, -hy, -hz],

        // top outline
        [-hx, hy, -hz], [hx, hy, -hz],
        [hx, hy, -hz], [hx, hy, hz],
        [hx, hy, hz], [-hx, hy, hz],
        [-hx, hy, hz], [-hx, hy, -hz],

        // groundlevel outline
        [-hx, groundY, -hz], [hx, groundY, -hz],
        [hx, groundY, -hz], [hx, groundY, hz],
        [hx, groundY, hz], [-hx, groundY, hz],
        [-hx, groundY, hz], [-hx, groundY, -hz]
    ];

    const vertices = new Float32Array(points.flat());
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({ color: 0x111111 });
    return new THREE.LineSegments(geometry, material);
}