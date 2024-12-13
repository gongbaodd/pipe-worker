/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDS } from "./System";

export default class Entity {
  id: IDS;
  components: Map<string, unknown>;
  constructor(id: IDS) {
    this.id = id;
    this.components = new Map<string, unknown>();
  }
  addComponent<T extends { constructor: { name: string } }>(component: T) {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T>(componentClass: { new (...args: any[]): T }): T | undefined {
    return this.components.get(componentClass.name) as T | undefined;
  }

  hasComponent<T>(componentClass: { new (...args: any[]): T }): boolean {
    return this.components.has(componentClass.name);
  }
}
