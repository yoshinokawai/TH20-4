import { registerRootComponent } from 'expo';
import App from './src/App'; // Trỏ đường dẫn vào App.tsx bên trong src

// Đăng ký App làm Component gốc để hiển thị lên màn hình
registerRootComponent(App);