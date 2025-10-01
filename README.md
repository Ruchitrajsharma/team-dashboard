
## React + Vite



# My-Task Dashboard

A modern and responsive **HR/Admin Dashboard** built with React and Tailwind CSS.
This project provides insights into employees, applications, interviews, and other management features.

---

##  Features

*  **Dashboard Overview** with employee statistics and analytics
*  **Employee Management** (attendance, leave, late coming, absent tracking)
*  **Applications Tracking** (total applications, interviews, hired count)
*  **Upcoming Interviews** section
*  **Admin Profile** management
*  **Dark Mode & RTL Support**

---

##  Tech Stack

* **React.js**
* **Tailwind CSS**
* **Chart.js / Recharts** (for graphs & charts)
* **Vite / Create React App** (depending on setup)
* **Redux toolkit**

---

##  Project Structure

```
my-task-dashboard/
│── public/             # Static files
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Dashboard pages
│   ├── redux/         
│   ├── App.js
│   ├── index.js
│── package.json
│── tailwind.config.js
│── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/my-task-dashboard.git
   cd my-task-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   or (if using CRA):

   ```bash
   npm start
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---




## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

















This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
