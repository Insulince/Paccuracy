import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from "@angular/core";
import * as THREE from "three";
import "./js/EnableThreeExamples";
import {BoxWrapper, ItemWrapper, PaccurateResponse} from "../model/model";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";
import {PaccurateService} from "../services/paccurate.service";

@Component({
  selector: "app-three-js",
  templateUrl: "./three-js.component.html",
  styleUrls: ["./three-js.component.scss"]
})
export class ThreeJsComponent implements OnInit, AfterViewInit {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  @Input() paccurateResponse: PaccurateResponse;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;

  public controls: THREE.OrbitControls;

  @ViewChild("canvas")
  private canvasRef: ElementRef;

  public currentlyFocusedBoxIndex: number;
  public boxGeometries: Array<THREE.BoxGeometry> = [];
  public boxMaterials: Array<THREE.MeshBasicMaterial> = [];
  public boxCubes: Array<THREE.Mesh> = [];
  public itemGeometries: Array<THREE.BoxGeometry> = [];
  public itemMaterials: Array<THREE.MeshStandardMaterial> = [];
  public itemCubes: Array<THREE.Mesh> = [];

  constructor(private paccurateService: PaccurateService) {
    this.render = this.render.bind(this);
    // this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    // this.scene.add(new THREE.AxesHelper(200));

    this.paccurateResponse.boxes.forEach(
      (boxWrapper: BoxWrapper, i: number): void => {
        this.boxGeometries.push(new THREE.BoxGeometry(boxWrapper.box.dimensions.z, boxWrapper.box.dimensions.x, boxWrapper.box.dimensions.y));
        this.boxMaterials.push(new THREE.MeshBasicMaterial({color: 666666, wireframe: true, wireframeLinewidth: 10}));
        this.boxCubes.push(new THREE.Mesh(this.boxGeometries[this.boxGeometries.length - 1], this.boxMaterials[this.boxMaterials.length - 1]));
        this.boxCubes[this.boxCubes.length - 1].position.set(boxWrapper.box.dimensions.z / 2 + ((boxWrapper.box.dimensions.z) * i + (i * boxWrapper.box.dimensions.z)), boxWrapper.box.dimensions.x / 2, boxWrapper.box.dimensions.y / 2);
        boxWrapper.box.items.forEach(
          (itemWrapper: ItemWrapper): void => {
            this.itemGeometries.push(new THREE.BoxGeometry(itemWrapper.item.dimensions.z, itemWrapper.item.dimensions.x, itemWrapper.item.dimensions.y));
            this.itemMaterials.push(new THREE.MeshStandardMaterial({color: itemWrapper.item.color}));
            this.itemCubes.push(new THREE.Mesh(this.itemGeometries[this.itemGeometries.length - 1], this.itemMaterials[this.itemMaterials.length - 1]));
            this.itemCubes[this.itemCubes.length - 1].position.set(
              (itemWrapper.item.dimensions.z - boxWrapper.box.dimensions.z) / 2 + itemWrapper.item.origin.z,
              (itemWrapper.item.dimensions.x - boxWrapper.box.dimensions.x) / 2 + itemWrapper.item.origin.x,
              (itemWrapper.item.dimensions.y - boxWrapper.box.dimensions.y) / 2 + itemWrapper.item.origin.y
            );
            this.itemCubes[this.itemCubes.length - 1].material.transparent = true;
            this.itemCubes[this.itemCubes.length - 1].material.opacity = 0.5;
            this.boxCubes[this.boxCubes.length - 1].add(this.itemCubes[this.itemCubes.length - 1]);
          }
        );
        this.scene.add(this.boxCubes[this.boxCubes.length - 1]);
      }
    );
  }

  private createLight() {
    let light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 100);
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, -100);
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 100, 0);
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, -100, 0);
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(-50, 0, 0);
    this.scene.add(light);

    light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(500, 0, 0);
    this.scene.add(light);
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );

    // Set position and look at
    const firstBoxDimensions = this.paccurateResponse.boxes[0].box.dimensions;
    this.camera.position.x = firstBoxDimensions.z / 2;
    this.camera.position.y = firstBoxDimensions.x / 2;
    this.camera.position.z = firstBoxDimensions.y * firstBoxDimensions.z + 5;

    // X = Z, Y = X, Z = Y
  }

  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = true;

    this.render();
  }

  public render() {
    let self: ThreeJsComponent = this;
    self.renderer.render(this.scene, this.camera);
  }

  public addControls() {
    this.controls = new THREE.OrbitControls(this.camera, document.getElementById("three-canvas"));
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.addEventListener("change", this.render);

    this.currentlyFocusedBoxIndex = 0;
    const firstBox = this.paccurateResponse.boxes[this.currentlyFocusedBoxIndex].box.dimensions;
    this.controls.target = new THREE.Vector3(firstBox.z / 2, firstBox.x / 2, firstBox.y / 2);
  }

  /* EVENTS */

  public onMouseDown(event: MouseEvent) {
    console.log("onMouseDown");
    event.preventDefault();

    // Example of mesh selection/pick:
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, this.camera);

    let obj: THREE.Object3D[] = [];
    this.findAllObjects(obj, this.scene);
    let intersects = raycaster.intersectObjects(obj);
    console.log("Scene has " + obj.length + " objects");
    console.log(intersects.length + " intersected objects found");
    intersects.forEach((i) => {
      console.log(i.object); // do what you want to do with object
    });

  }

  private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {
    // NOTE: Better to keep separate array of selected objects
    if (parent.children.length > 0) {
      parent.children.forEach((i) => {
        pred.push(i);
        this.findAllObjects(pred, i);
      });
    }
  }

  public onMouseUp(event: MouseEvent) {
    console.log("onMouseUp");
  }


  @HostListener("window:resize", ["$event"])
  public onResize(event: Event) {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    console.log("onResize: " + this.canvas.clientWidth + ", " + this.canvas.clientHeight);

    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  @HostListener("document:keypress", ["$event"])
  public onKeyPress(event: KeyboardEvent) {
    console.log("onKeyPress: " + event.key);
  }

  /* LIFECYCLE */
  ngAfterViewInit() {
    console.log("After View Init");
    console.log("Response", this.paccurateResponse);

    this.boxGeometries = [];
    this.boxMaterials = [];
    this.boxCubes = [];
    this.itemGeometries = [];
    this.itemMaterials = [];
    this.itemCubes = [];
    this.currentlyFocusedBoxIndex = 0;

    this.createScene();
    this.createLight();
    this.createCamera();
    this.startRendering();
    this.addControls();

    this.controls.update();
  }

  ngOnInit() {
    this.paccurateService.paccurateResponseObs
      .subscribe((response: PaccurateResponse) => {
        this.paccurateResponse = response;
        while (this.scene.children.length > 0) {
          this.scene.remove(this.scene.children[0]);
        }

        this.ngAfterViewInit();
      });
  }

  lookAtPreviousBox(): void {
    if (this.currentlyFocusedBoxIndex > 0) {
      this.currentlyFocusedBoxIndex--;
      const currentBox = this.boxCubes[this.currentlyFocusedBoxIndex];
      this.controls.target.set(currentBox.position.x, currentBox.position.y, currentBox.position.z);

      const currentBoxDimensions = this.paccurateResponse.boxes[this.currentlyFocusedBoxIndex].box.dimensions;
      const currentBoxPositions = this.boxCubes[this.currentlyFocusedBoxIndex].position;
      this.camera.position.x = currentBoxDimensions.z / 2 + currentBoxPositions.x;
      this.camera.position.y = currentBoxDimensions.x / 2 + currentBoxPositions.y;
      this.camera.position.z = currentBoxDimensions.y * currentBoxDimensions.z + currentBoxPositions.z + 5;
    }

    this.controls.update();
  }

  lookAtNextBox(): void {
    if (this.currentlyFocusedBoxIndex < this.boxCubes.length - 1) {
      this.currentlyFocusedBoxIndex++;
      const currentBox = this.boxCubes[this.currentlyFocusedBoxIndex];
      this.controls.target.set(currentBox.position.x, currentBox.position.y, currentBox.position.z);

      const currentBoxDimensions = this.paccurateResponse.boxes[this.currentlyFocusedBoxIndex].box.dimensions;
      const currentBoxPositions = this.boxCubes[this.currentlyFocusedBoxIndex].position;
      this.camera.position.x = currentBoxDimensions.z / 2 + currentBoxPositions.x;
      this.camera.position.y = currentBoxDimensions.x / 2 + currentBoxPositions.y;
      this.camera.position.z = currentBoxDimensions.y * currentBoxDimensions.z + currentBoxPositions.z + 5;
    }

    this.controls.update();
  }
}
