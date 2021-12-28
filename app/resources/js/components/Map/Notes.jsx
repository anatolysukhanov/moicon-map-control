const NoteInfoWindowStyles = () => {
    return (
        <style type="text/css">
            {`
                .gm-style .gm-style-iw {
                    background: #FFFFFF !important;
                    box-shadow: 0px -8px 60px rgba(13, 15, 17, 0.15);
                    border-radius: 0px;
                }

                .gm-style .gm-style-iw-c {
                    overflow: visible !important;
                    padding: 0px !important;
                }

                .gm-style .gm-style-iw {
                    overflow: visible !important;
                }

                .gm-style-iw > button > img {
                    display: none !important;
                }

                .gm-style-iw > button {
                    opacity: 1 !important;
                    top: 6px !important;
                    right: 6px !important;
                    width: 38px !important;
                    height: 38px !important;
                    background: url("${framework.resource("/img/btn-comments-close.png")}") no-repeat !important;
                }

                .gm-style-iw > button:hover {
                    background: url("${framework.resource("/img/btn-close-hover.png")}") no-repeat !important;
                }

                .gm-style-iw-d {
                    overflow: hidden !important;
                }
            `}
        </style>
    )
}

class ReactReduxMapNotes extends React.Component {

    render = () => {
        const {dispatch, notes, clickedNote} = this.props;
        return (
            <>
                {
                    notes.map(note => (
                        <reactGoogleMapsApi.Marker
                            key={note.id}
                            position={{
                                lat: note.lat,
                                lng: note.lng,
                            }}
                            clickable={true}
                            icon={{
                                url: framework.resource("/img/note.png"),
                                anchor: new google.maps.Point(24, 24),
                            }}
                            onClick={marker => {
                                dispatch(NOTE_CLICKED_ACTION(note.id));
                            }}
                        />))}
                {
                    clickedNote &&
                    <>
                        <NoteInfoWindowStyles/>
                        <reactGoogleMapsApi.InfoWindow
                            position={{
                                lat: clickedNote.lat,
                                lng: clickedNote.lng,
                            }}
                            onCloseClick={() => {
                                dispatch(NOTE_POPUP_CLOSE_ACTION());
                            }}
                            options={{
                                pixelOffset: new google.maps.Size(-5, -30)
                            }}
                        >
                            <div className="infowindow-note">
                                <div className="infowindow-note-name"><Translation id="Latitude"/></div>
                                <div className="infowindow-note-value">{clickedNote.lat}</div>
                                <div className="infowindow-note-name"><Translation id="Longitude"/></div>
                                <div className="infowindow-note-value">{clickedNote.lng}</div>
                                {
                                    clickedNote.address &&
                                    <>
                                        <div className="infowindow-note-name"><Translation id="Address"/></div>
                                        <div className="infowindow-note-value">{clickedNote.address}</div>
                                    </>
                                }
                                <div className="infowindow-note-name"><Translation id="Message"/></div>
                                <div className="infowindow-note-value">{clickedNote.message}</div>
                                <div className="infowindow-note-name"><Translation id="Expire Date"/></div>
                                <div className="infowindow-note-value">{clickedNote.expirationDate ? formatDate(new Date(clickedNote.expirationDate)) : ""}</div>
                            </div>
                        </reactGoogleMapsApi.InfoWindow>
                    </>
                }
            </>
        );
    };
}
