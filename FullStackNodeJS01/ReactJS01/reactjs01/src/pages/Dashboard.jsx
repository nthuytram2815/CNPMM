import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import MainLayout from "../components/layout/MainLayout";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <MainLayout>
            <h1>Dashboard</h1>
            <p>User: {user?.email}</p>
        </MainLayout>
    );
}
