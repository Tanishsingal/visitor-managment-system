# Visitor Management System

A modern, full-stack application for managing visitor access, check-ins, and employee notifications.

## 🚀 Features

### Visitor Management
- Visitor registration
- QR code-based check-in/check-out
- Visit status tracking
- Real-time notifications

### Employee Portal
- Visit request approval/denial
- Real-time visitor notifications
- Visit history tracking
- Department-wise analytics

### Admin Dashboard
- Employee management
- Visit analytics
- System monitoring
- Report generation

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Chart.js for analytics
- WebSocket for real-time updates

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- JWT authentication
- WebSocket for real-time communication

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env with your database credentials and other configurations

# Run Prisma migrations
npx prisma migrate dev

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env with your backend API URL

# Start the development server
npm run dev
```

## 💾 Environment Variables

### Backend
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### Frontend
```env
VITE_API_URL="http://localhost:5000/api"
```

## 🗄️ Database Schema
```prisma
model Visitor {
  id        Int      @id @default(autoincrement())
  fullName  String
  email     String
  phone     String
  company   String?
  photoUrl  String?
  visits    Visit[]
}

model Employee {
  id          Int      @id @default(autoincrement())
  fullName    String
  email       String   @unique
  password    String
  department  String
  visits      Visit[]
}

model Visit {
  id          Int         @id @default(autoincrement())
  visitorId   Int
  employeeId  Int
  purpose     String
  checkIn     DateTime
  checkOut    DateTime?
  status      VisitStatus @default(PENDING)
  visitor     Visitor     @relation(fields: [visitorId], references: [id])
  employee    Employee    @relation(fields: [employeeId], references: [id])
}

enum VisitStatus {
  PENDING
  APPROVED
  DENIED
  CHECKED_IN
  CHECKED_OUT
  OVERSTAY
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/employees/login`
- `POST /api/admin/login`

### Visitors
- `POST /api/visitors/register`
- `GET /api/visitors`

### Visits
- `POST /api/visits/request`
- `PUT /api/visits/:id/approve`
- `PUT /api/visits/:id/deny`
- `POST /api/visits/:id/check-in`
- `POST /api/visits/:id/check-out`
- `GET /api/visits/active`

### Analytics
- `GET /api/analytics/dashboard`
- `GET /api/analytics/department/:department`
- `GET /api/analytics/date/:date`

## 📱 Screenshots

[Add screenshots of your application here]

## 🔒 Security Features
- JWT authentication
- Role-based access control
- Password hashing
- Input validation
- XSS protection
- CORS configuration

## 🚀 Deployment

### Backend
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Frontend
```bash
# Build the application
npm run build

# The build folder is ready to be deployed
```

## 📈 Future Improvements
- Multi-language support
- Advanced analytics dashboard
- Mobile application
- Visitor face recognition
- Integration with access control systems
- Automated email reminders
- Visitor blacklist management

## 👥 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the `LICENSE.md` file for details

## 👏 Acknowledgments
- Tailwind CSS
- React
- Node.js
- Prisma
- Chart.js

## 📞 Contact
Your Name - tanishsingal245@gmail.com

Project Link: [GitHub Repository](https://github.com/Tanishsingal/visitor-managment-system)

