import { createBrowserRouter, Outlet } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import Jobs from "@/pages/Jobs";
import Contracts from "@/pages/Commercial/Contracts";
import PurchaseOrders from "@/pages/Commercial/PurchaseOrders";
import SupplyAgreements from "@/pages/Commercial/SupplyAgreements";
import Clients from "@/pages/Directory/Clients";
import Suppliers from "@/pages/Directory/Suppliers";
import Documents from "@/pages/Documents";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

/**
 * Route tree — each route that should appear in the breadcrumb trail
 * carries a `handle: { crumb: 'Label' }`.
 *
 * The TopBar reads these via useMatches() — no label logic lives there.
 * Adding a new route: just add handle: { crumb: '...' } and it appears
 * automatically.
 */
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AppShell />,
    children: [
      // Home group — dashboard, projects, jobs
      {
        path: "",
        handle: { crumb: "Home" },
        children: [
          {
            index: true,
            element: <Dashboard />,
            handle: { crumb: "Dashboard" },
          },
          {
            path: "projects",
            element: <Projects />,
            handle: { crumb: "Projects" },
          },
          {
            path: "projects/:id",
            element: <Projects />,
            handle: { crumb: "Project Detail" },
          },
          { path: "jobs", element: <Jobs />, handle: { crumb: "Jobs" } },
          {
            path: "jobs/:id",
            element: <Jobs />,
            handle: { crumb: "Job Detail" },
          },
        ],
      },

      // Commercial group
      {
        path: "commercial",
        element: <Outlet />,
        handle: { crumb: "Commercial" },
        children: [
          {
            path: "contracts",
            element: <Contracts />,
            handle: { crumb: "Contracts" },
          },
          {
            path: "contracts/:id",
            element: <Contracts />,
            handle: { crumb: "Contract Detail" },
          },
          {
            path: "purchase-orders",
            element: <PurchaseOrders />,
            handle: { crumb: "Purchase Orders" },
          },
          {
            path: "purchase-orders/:id",
            element: <PurchaseOrders />,
            handle: { crumb: "PO Detail" },
          },
          {
            path: "supply-agreements",
            element: <SupplyAgreements />,
            handle: { crumb: "Supply Agreements" },
          },
          {
            path: "supply-agreements/:id",
            element: <SupplyAgreements />,
            handle: { crumb: "Agreement Detail" },
          },
        ],
      },

      // Directory group
      {
        path: "directory",
        element: <Outlet />,
        handle: { crumb: "Directory" },
        children: [
          {
            path: "clients",
            element: <Clients />,
            handle: { crumb: "Clients" },
          },
          {
            path: "clients/:id",
            element: <Clients />,
            handle: { crumb: "Client Detail" },
          },
          {
            path: "suppliers",
            element: <Suppliers />,
            handle: { crumb: "Suppliers & Partners" },
          },
          {
            path: "suppliers/:id",
            element: <Suppliers />,
            handle: { crumb: "Supplier Detail" },
          },
        ],
      },

      // System group — documents
      {
        path: "system",
        element: <Outlet />,
        handle: { crumb: "System" },
        children: [
          {
            path: "documents",
            element: <Documents />,
            handle: { crumb: "Documents" },
          },
        ],
      },

      // Admin group — users & teams, settings
      {
        path: "admin",
        element: <Outlet />,
        handle: { crumb: "Admin" },
        children: [
          {
            path: "users",
            element: <Admin />,
            handle: { crumb: "Users & Teams" },
          },
          {
            path: "settings",
            element: <Admin />,
            handle: { crumb: "Settings" },
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
        handle: { crumb: "Not Found" },
      },
    ],
  },
]);
