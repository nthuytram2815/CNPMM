import Header from "./Header";

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div style={{ padding: 20 }}>
                {children}
            </div>
        </div>
    );
}
