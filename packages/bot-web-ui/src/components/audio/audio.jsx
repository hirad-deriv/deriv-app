import React from 'react';

const Audio = () => (
    <>
        <audio id='announcement' src={`${__webpack_public_path__}media/announcement.mp3`} autostart='false' />
        <audio id='earned-money' src={`${__webpack_public_path__}media/coins.mp3`} autostart='false' />
        <audio id='job-done' src={`${__webpack_public_path__}media/job-done.mp3`} autostart='false' />
        <audio id='error' src={`${__webpack_public_path__}media/out-of-bounds.mp3`} autostart='false' />
        <audio id='severe-error' src={`${__webpack_public_path__}media/i-am-being-serious.mp3`} autostart='false' />
    </>
);

export default Audio;
