declare module 'react-draggable' {
  import * as React from 'react';

  export interface DraggableProps {
    axis?: 'both' | 'x' | 'y' | 'none';
    bounds?: string | { left?: number; top?: number; right?: number; bottom?: number } | false;
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    defaultPosition?: { x: number; y: number };
    position?: { x: number; y: number };
    scale?: number;
    onStart?: (e: Event, data: any) => void | false;
    onDrag?: (e: Event, data: any) => void | false;
    onStop?: (e: Event, data: any) => void | false;
    disabled?: boolean;
    handle?: string;
    cancel?: string;
    nodeRef?: React.RefObject<HTMLElement | null>;
    children?: React.ReactNode;
  }

  export default class Draggable extends React.Component<DraggableProps> {}
}
