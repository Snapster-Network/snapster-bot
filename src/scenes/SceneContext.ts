import { Scene } from "./Scene";

class SceneContext {
    public scene: Scene | null;
    private state: Record<string, any>;

    constructor() {
        this.scene = null;
        this.state = {};
    }

    getState() {
        return this.state
    }

    // enter(scene: Scene) {
    //     this.scene = scene;
    //     this.state = {};
    //     scene.onEnter(this);
    // }

    // leave() {
    //     if (this.scene) {
    //         this.scene.leave(this);
    //         this.scene = null;
    //         this.state = {};
    //     }
    // }
}

export { SceneContext }