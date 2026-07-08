declare module 'react-draggable' {
  import * as React from 'react';

  export interface DraggableData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
  }

  export interface DraggableProps {
    axis?: 'both' | 'x' | 'y' | 'none';
    bounds?: string | { left?: number; top?: number; right?: number; bottom?: number } | false;
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    defaultPosition?: { x: number; y: number };
    position?: { x: number; y: number };
    scale?: number;
    onStart?: (e: Event, data: DraggableData) => void | false;
    onDrag?: (e: Event, data: DraggableData) => void | false;
    onStop?: (e: Event, data: DraggableData) => void | false;
    disabled?: boolean;
    handle?: string;
    cancel?: string;
    nodeRef?: React.RefObject<HTMLElement | null>;
    children?: React.ReactNode;
  }

  export default class Draggable extends React.Component<DraggableProps> {}
}
