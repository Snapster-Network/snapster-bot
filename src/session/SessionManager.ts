import SceneManager from "../scenes/SceneManager";
import { ICtx } from "../types/context";
import { ISceneManagerObserver } from "../types/scene";
import { ISession } from "../types/session";
import Session from "./Session";

class SessionManager {
    private sessions: Record<string, Session> = {};
    private observers: ISceneManagerObserver[] = [];

    addObserver(observer: ISceneManagerObserver) {
        this.observers.push(observer);
    }

    notifyObservers(ctx: ICtx, sceneManager: SceneManager) {
        for (const observer of this.observers) {
            observer(ctx, sceneManager, this);
        }
    }

    getSession(userId: string): ISession | undefined {
        if (!this.sessions[userId]) {
            return undefined
        }
        return this.sessions[userId];
    }

    setSession(ctx: ICtx, session: string | undefined, sceneManager: SceneManager): Session {
        if (!session) throw new Error("Default scene not set")
        const newSession = new Session(session);
        this.sessions[ctx.message.from] = newSession
        this.notifyObservers(ctx, sceneManager);
        return newSession
    }

    updateSessionStep(userId: string, isEnterStep: boolean) {
        this.sessions[userId].setIsEnterStep(isEnterStep)
    }
}

export default SessionManager