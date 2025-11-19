import { CrowOutlined } from "@ant-design/icons";
import { Result } from "antd";

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Result
                icon={<CrowOutlined />}
                title="Welcome to the Home Page"
            />
        </div>
    )
}
export default HomePage;