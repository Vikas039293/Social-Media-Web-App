import React from 'react'

function date(props) {
    function formatTime(timestamp) {
        const currentDate = new Date();
        const postDate = new Date(timestamp);
        const timeDifferenceInSeconds = Math.floor((currentDate - postDate) / 1000);
        if (timeDifferenceInSeconds < 60) {
          return `${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
          const minutes = Math.floor(timeDifferenceInSeconds / 60);
          return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
          const hours = Math.floor(timeDifferenceInSeconds / 3600);
          return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
          const day = postDate.getDate();
          const month = postDate.toLocaleString('default', { month: 'long' });
          const year = postDate.getFullYear();
          return `${day} ${month} ${year}`;
        }
      }
      const time=formatTime(props.time);
  return (
    <>
    {time}
    </>
  )
}

export default date;