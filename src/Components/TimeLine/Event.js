import React from 'react'
import EventIcon from "@mui/icons-material/Event";
import LocationOn from '@mui/icons-material/LocationOn';

function Event() {

  //use id and 
  //do API call for the eventId to get event Info

  return (
    <>
      <div className='container mt-5'>



        <div className='row'>
          <div className='col'>
            <img className='img img-fluid' src='https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=' alt="alt" height={300} width={900}></img>
          </div>
          
          <div className='col'>
            <h2>Event Name Event Name Event Name</h2>
            
              <EventIcon style={{ color: "#28104e" }} />
              <span
                style={{
                  color: "#28104e",
                  fontWeight: 600,
                  alignItems: "center",
                  marginLeft: "7px",
                  letterSpacing: "1.5px",
                }}
              >
                Date and Time
              </span>

              <LocationOn style={{ color: "#28104e" }} />
              <span
                style={{
                  color: "#28104e",
                  fontWeight: 600,
                  alignItems: "center",
                  marginLeft: "7px",
                  letterSpacing: "1.5px",
                }}
              >
                Location
              </span>
            


            
          </div>

        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col'>
            <h1>Description</h1>
            <p>UAlbany Mock Trial is so excited to finally start our weekly general meetings! Meetings will be Sunday at 5:30 PM in Social Science 256 and Thrusday at 7:30 PM in Humanities 137. We can’t wait to see everyone there!!
              UAlbany Mock Trial is so excited to finally start our weekly general meetings! Meetings will be Sunday at 5:30 PM in Social Science 256 and Thrusday at 7:30 PM in Humanities 137. We can’t wait to see everyone there!!
              UAlbany Mock Trial is so excited to finally start our weekly general meetings! Meetings will be Sunday at 5:30 PM in Social Science 256 and Thrusday at 7:30 PM in Humanities 137. We can’t wait to see everyone there!!</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Event
