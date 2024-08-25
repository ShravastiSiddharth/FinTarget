const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '../../backend/logs/task.log');

const logTask = async (user_id) => {
    const logMessage = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('Failed to log task:', err);
    });
};

module.exports = { logTask };
