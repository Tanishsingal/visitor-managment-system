// // src/services/websocketService.ts
// class WebSocketService {
//     private socket: WebSocket | null = null;
//     private listeners: Map<string, Set<(data: any) => void>> = new Map();
//     private reconnectAttempts = 0;
//     private maxReconnectAttempts = 5;
  
//     connect() {
//       try {
//         this.socket = new WebSocket('ws://localhost:5000/ws'); // Update with your WebSocket URL
  
//         this.socket.onopen = () => {
//           console.log('WebSocket connected');
//           this.reconnectAttempts = 0;
//         };
  
//         this.socket.onmessage = (event) => {
//           const { type, data } = JSON.parse(event.data);
//           this.notifyListeners(type, data);
//         };
  
//         this.socket.onclose = () => {
//           console.log('WebSocket disconnected');
//           this.handleReconnect();
//         };
  
//         this.socket.onerror = (error) => {
//           console.error('WebSocket error:', error);
//         };
//       } catch (error) {
//         console.error('Failed to connect to WebSocket:', error);
//       }
//     }
  
//     private handleReconnect() {
//       if (this.reconnectAttempts < this.maxReconnectAttempts) {
//         this.reconnectAttempts++;
//         console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
//         setTimeout(() => this.connect(), 5000);
//       }
//     }
  
//     subscribe(eventType: string, callback: (data: any) => void) {
//       if (!this.listeners.has(eventType)) {
//         this.listeners.set(eventType, new Set());
//       }
//       this.listeners.get(eventType)?.add(callback);
//     }
  
//     unsubscribe(eventType: string, callback: (data: any) => void) {
//       this.listeners.get(eventType)?.delete(callback);
//     }
  
//     private notifyListeners(type: string, data: any) {
//       this.listeners.get(type)?.forEach(callback => callback(data));
//     }
//   }
  
//   export const wsService = new WebSocketService();

// src/services/websocketService.ts
// class WebSocketService {
//     private socket: WebSocket | null = null;
//     private listeners: Map<string, Set<(data: any) => void>> = new Map();
  
//     connect() {
//       try {
//         this.socket = new WebSocket('ws://localhost:5000/ws'); // Update with your WebSocket URL
  
//         this.socket.onopen = () => {
//           console.log('WebSocket connected');
//         };
  
//         this.socket.onmessage = (event) => {
//           const { type, data } = JSON.parse(event.data);
//           this.notifyListeners(type, data);
//         };
  
//         this.socket.onclose = () => {
//           console.log('WebSocket disconnected');
//           // Attempt to reconnect after 5 seconds
//           setTimeout(() => this.connect(), 5000);
//         };
//       } catch (error) {
//         console.error('WebSocket connection failed:', error);
//       }
//     }
  
//     subscribe(eventType: string, callback: (data: any) => void) {
//       if (!this.listeners.has(eventType)) {
//         this.listeners.set(eventType, new Set());
//       }
//       this.listeners.get(eventType)?.add(callback);
//     }
  
//     unsubscribe(eventType: string, callback: (data: any) => void) {
//       this.listeners.get(eventType)?.delete(callback);
//     }
  
//     private notifyListeners(type: string, data: any) {
//       this.listeners.get(type)?.forEach(callback => callback(data));
//     }
//   }
  
//   export const wsService = new WebSocketService();
  

// class WebSocketService {
//     private socket: WebSocket | null = null;
//     private listeners: Map<string, Set<(data: any) => void>> = new Map();
  
//     constructor() {
//       window.addEventListener("beforeunload", () => {
//         sessionStorage.setItem("wsConnected", "true");
//       });
//     }
  
//     connect() {
//       if (this.socket && this.socket.readyState === WebSocket.OPEN) {
//         console.log("WebSocket already connected.");
//         return;
//       }
  
//       try {
//         this.socket = new WebSocket("ws://localhost:8080/1"); // Update with your WebSocket URL
  
//         this.socket.onopen = () => {
//           console.log("WebSocket connected");
//           sessionStorage.setItem("wsConnected", "true");
//         };
  
//         this.socket.onmessage = (event) => {
//           const { type, data } = JSON.parse(event.data);
//           this.notifyListeners(type, data);
//         };
  
//         this.socket.onclose = () => {
//           console.log("WebSocket disconnected");
//           sessionStorage.removeItem("wsConnected");
//           // Attempt to reconnect after 5 seconds
//           setTimeout(() => this.connect(), 5000);
//         };
//       } catch (error) {
//         console.error("WebSocket connection failed:", error);
//       }
//     }
  
//     subscribe(eventType: string, callback: (data: any) => void) {
//       if (!this.listeners.has(eventType)) {
//         this.listeners.set(eventType, new Set());
//       }
//       this.listeners.get(eventType)?.add(callback);
//     }
  
//     unsubscribe(eventType: string, callback: (data: any) => void) {
//       this.listeners.get(eventType)?.delete(callback);
//     }
  
//     private notifyListeners(type: string, data: any) {
//       this.listeners.get(type)?.forEach((callback) => callback(data));
//     }
//   }
  
//   export const wsService = new WebSocketService();
  
//   // Automatically reconnect on refresh
//   if (sessionStorage.getItem("wsConnected")) {
//     wsService.connect();
//   }
  

class WebSocketService {
    private socket: WebSocket | null = null;
    private listeners: Map<string, Set<(data: any) => void>> = new Map();
  
    connect(userId: number) {
      try {
        this.socket = new WebSocket(`ws://localhost:8080?userId=${userId}`);
  
        this.socket.onopen = () => {
          console.log("WebSocket connected");
        };
  
        this.socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === "notification") {
            this.notifyListeners("notification", message.message);
          }
        };
  
        this.socket.onclose = () => {
          console.log("WebSocket disconnected");
          setTimeout(() => this.connect(userId), 5000);
        };
      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    }
  
    subscribe(eventType: string, callback: (data: any) => void) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType)?.add(callback);
    }
  
    unsubscribe(eventType: string, callback: (data: any) => void) {
      this.listeners.get(eventType)?.delete(callback);
    }
  
    private notifyListeners(type: string, data: any) {
      this.listeners.get(type)?.forEach((callback) => callback(data));
    }
  }
  
  export const wsService = new WebSocketService();