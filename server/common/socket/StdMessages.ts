import { Socket } from 'socket.io';

import { IExtendedSocket } from './interfaces';

export default abstract class StdMessages {
  static sendToast(socket: Socket, message: string, icon: string, intent: string): Socket {
    socket.emit('toast', { message, icon, intent });
    return socket;
  }

  static sendErrorMessage(socket: Socket, message: string): Socket {
    return this.sendToast(socket, message, 'error', 'danger');
  }

  static sendScriptExecutionState(socket: IExtendedSocket): Socket {
    socket.emit('setScriptExecutionState', {
      isProcessing: socket.isProcessing,
      isRunning: socket.isRunning
    });
    return socket;
  }
}
