<?php

function msgFlash($message, $type = 'success')
{
    session()->flash('msg', $message);
    session()->flash('type', $type);
}
