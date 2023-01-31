import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://github.com/Muhannad-Abbasi" target='_blank'><AiFillGithub /></a>
    </div>
    <div>
      <a href="https://www.facebook.com/profile.php?id=100002102530803" target='_blank'><FaFacebookF /></a>  
    </div>
    <div>
      <a href="https://www.instagram.com/muhannad_abbasson/" target='_blank'><BsInstagram /></a>
    </div>
  </div>
);

export default SocialMedia;