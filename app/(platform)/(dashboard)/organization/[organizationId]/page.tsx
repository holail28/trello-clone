import { auth } from "@clerk/nextjs/server";

const organizationPage = () => {
    const { userId, orgId } = auth();
    return (
        <div>
            Organization Page
        </div>
    )
};

export default organizationPage;