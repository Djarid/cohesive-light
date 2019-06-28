module.exports = {
    parstTimestamp: function(data) {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
        };
        //console.log("timestamp: ", data.joined);
        data.joined["dateString"] = (new Date((data.joined._seconds * 1000))).toLocaleDateString("en-GB",  options);
        //console.log('Data', data);
        return data;
    }

}
