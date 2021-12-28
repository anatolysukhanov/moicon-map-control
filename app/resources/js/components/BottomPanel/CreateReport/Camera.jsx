class ReactReduxCreateReportCamera extends React.Component {

    static IMAGE_HEIGHT = 1080;

    static THUMBNAIL_WIDTH = 460;
    static THUMBNAIL_HEIGHT = 320;


    constructor(props) {
        super(props)
        this.videoRef = React.createRef();
        this.imageRef = React.createRef();
        this.thumbnailRef = React.createRef();
    }

    componentDidMount() {
        navigator.mediaDevices
            .getUserMedia({
                audio:false,
                video:{
                    height:     {ideal:ReactReduxCreateReportCamera.IMAGE_HEIGHT + 1},
                    aspectRatio:16/9,
                    facingMode: 'environment',
                },
            })
            .then(stream => {
                try {
                    this.videoRef.current.srcObject = stream;
                } catch (error) {
                    this.videoRef.current.src = window.URL.createObjectURL(stream);
                }
                this.videoRef.current.play();
            })
            .catch(Logger.error);
    }

    takeScreenshot = () =>
    {
        const isPortrait = DeviceOrientation.isPortrait();

        const imageCanvas = this.imageRef.current;
        const thumbnailCanvas = this.thumbnailRef.current;

        const imageCtx = imageCanvas.getContext('2d');
        const thumbnailCtx = thumbnailCanvas.getContext('2d');

        imageCtx.setTransform(1, 0, 0, 1, 0, 0);
        thumbnailCtx.setTransform(1, 0, 0, 1, 0, 0);
        imageCtx.fillStyle = '#000000';
        thumbnailCtx.fillStyle = '#000000';

        const width = this.videoRef.current.videoWidth;
        const height = this.videoRef.current.videoHeight;

        let videoAspectRatio = (width / height);

        let imageHeight = ReactReduxCreateReportCamera.IMAGE_HEIGHT;
        let imageWidth = imageHeight * videoAspectRatio;

        let thumbnailHeight = ReactReduxCreateReportCamera.THUMBNAIL_HEIGHT;
        let thumbnailWidth = ReactReduxCreateReportCamera.THUMBNAIL_WIDTH;

        if(!isPortrait) {
            videoAspectRatio = 1.0 / videoAspectRatio;
            imageWidth = imageHeight * videoAspectRatio;
        }

        thumbnailCanvas.width = thumbnailWidth;
        thumbnailCanvas.height = thumbnailHeight;

        imageCanvas.width = imageWidth;
        imageCanvas.height = imageHeight;

        if(!isPortrait) {
            imageCtx.translate(0, imageHeight);
            imageCtx.rotate(270 * (Math.PI / 180));
            thumbnailCtx.translate(0, thumbnailHeight);
            thumbnailCtx.rotate(270 * (Math.PI / 180));

            // for upside down, use:
            //  imageCtx.translate(imageWidth, 0);
            //  imageCtx.rotate(Math.PI / 2);
            //  thumbnailCtx.translate(thumbnailWidth, 0);
            //  thumbnailCtx.rotate(Math.PI / 2);

            let tmp = imageWidth;
            // noinspection JSSuspiciousNameCombination
            imageWidth = imageHeight;
            imageHeight = tmp;

            tmp = thumbnailWidth;
            // noinspection JSSuspiciousNameCombination
            thumbnailWidth = thumbnailHeight;
            thumbnailHeight = tmp;
        }

        imageCtx.drawImage(this.videoRef.current, 0, 0, imageWidth, imageHeight);

        thumbnailCtx.fillRect(0, 0, thumbnailWidth, thumbnailHeight);
        const thumbnailAspectRatio = (thumbnailWidth / thumbnailHeight);
        if(videoAspectRatio <= thumbnailAspectRatio) {
            const fixedHeight = width/thumbnailAspectRatio;
            thumbnailCtx.drawImage(this.videoRef.current, 0, (height - fixedHeight) / 2, width, fixedHeight, 0, 0, thumbnailWidth, thumbnailHeight);
        } else {
            const fixedWidth = height*thumbnailAspectRatio;
            thumbnailCtx.drawImage(this.videoRef.current, (width - fixedWidth) / 2, 0, fixedWidth, height, 0, 0, thumbnailWidth, thumbnailHeight);
        }

        this.props.dispatch(REPORTS_CREATE_SAVE_SCREENSHOT_ACTION({
            imageUrl: imageCanvas.toDataURL('image/jpeg', 0.7),
            imageThumbnailUrl: thumbnailCanvas.toDataURL('image/jpeg', 0.7)
        }));
    }

    render() {
        return <div className="report-camera-container">
            <video ref={this.videoRef} autoPlay={true}/>
            <div className="report-camera-content">
                <div className="report-camera-button" onClick={this.takeScreenshot}/>
                <canvas className="report-camera-image-canvas" ref={this.imageRef}/>
                <canvas className="report-camera-thumbnail-canvas" ref={this.thumbnailRef}/>
            </div>
        </div>
    }
}
