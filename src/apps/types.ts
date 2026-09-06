import type { ComponentType, LazyExoticComponent } from "react";

export interface DesktopApp {
  id: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  defaultMode: "windowed" | "fullscreen";
  component: LazyExoticComponent<ComponentType>;
  author?: string;
  description?: string;
  hidden?: boolean;
}
