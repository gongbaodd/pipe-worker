export default class Entity {
  id: string;
  components: Map<string, unknown>;
  constructor(id: string) {
    this.id = id;
    this.components = new Map<string, unknown>();
  }
  addComponent<T extends { constructor: { name: string } }>(component: T) {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T>(componentClass: { new (...args: unknown[]): T }): T | undefined {
    return this.components.get(componentClass.name) as T | undefined;
  }

  hasComponent<T>(componentClass: { new (...args: unknown[]): T }): boolean {
    return this.components.has(componentClass.name);
  }
}
