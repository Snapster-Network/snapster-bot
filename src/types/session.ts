interface ISession {
    getCurrentScene(): string;
    setCurrentScene(scene: string): void;

    getIsEnterStep(): boolean;
    setIsEnterStep(isEnterVal: boolean): void;
}

interface ISessionContext {

}

export { ISession, ISessionContext }