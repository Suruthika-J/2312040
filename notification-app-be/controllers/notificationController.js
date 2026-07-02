const { fetchNotifications } = require("../services/notificationService");
const { Log } = require("../../logging-middleware");

const priorityMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

exports.getAllNotifications = async (req, res) => {
    try {

        await Log(
            "backend",
            "info",
            "controller",
            "Fetching notifications"
        );

        const notifications = await fetchNotifications();

        notifications.sort((a, b) => {

            const priorityDifference =
                (priorityMap[b.Type] || 0) -
                (priorityMap[a.Type] || 0);

            if (priorityDifference !== 0) {
                return priorityDifference;
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);

        });

        // Default Top 10
        // User can request ?limit=15 or ?limit=20
        const limit = parseInt(req.query.limit) || 10;

        const topNotifications = notifications.slice(0, limit);

        await Log(
            "backend",
            "info",
            "controller",
            `Returned Top ${limit} notifications`
        );

        res.status(200).json({
            success: true,
            total: topNotifications.length,
            notifications: topNotifications
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch notifications"
        });
    }
};