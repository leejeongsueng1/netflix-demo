import {Button, Modal} from "react-bootstrap";
import './MoviePreview.style.css'
import YouTube from "react-youtube";
import {useMoviePreview} from "../../../hooks/UseMoviePreview";

export const MoviePreview = (props) => {
    const {data, isLoading, isError, error} = useMoviePreview(props.movieId);
    const preview_key = data?.results[0].key;
    const _onReady = (event) =>
    {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
    }

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="previewModal"
        >
            <Modal.Header closeButton className="modal_header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body">
                {preview_key ? <YouTube videoId={preview_key} opts={opts}  onReady={_onReady}/> : <div>No preview</div>}
            </Modal.Body>
            <Modal.Footer className="modal_footer" style={{backgroundColor:"black", color:"whitesmoke"}}>
                <Button variant="outline-danger"  onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}