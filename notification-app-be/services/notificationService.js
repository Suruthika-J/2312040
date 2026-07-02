const axios = require("axios");

const NOTIFICATION_API =
    "http://4.224.186.213/evaluation-service/notifications";

async function fetchNotifications() {
    try {
        const response = await axios.get(NOTIFICATION_API, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
        });

        return response.data.notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        throw new Error("Unable to fetch notifications");
    }
}

module.exports = {
    fetchNotifications,
};