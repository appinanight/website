<?php

class Manifest
{
    private static $PARSED;

    private static function generate($file)
    {
        if ($parsed = self::$PARSED) {
            return $parsed[$file];
        }

        $path = kirby()->roots()->assets() . '/build/manifest.json';

        if (! file_exists($path)) {
            throw new \LogicException('Manifest file is missing');
        }

        $res = file_get_contents($path);

        self::$PARSED = json_decode($res, true);

        return self::generate($file);
    }

    public static function css($file)
    {
        return css([self::generate($file), '@auto']);
    }

    public static function js($file, $options = null)
    {
        return js([self::generate($file), '@auto'], $options);
    }
    
    public static function url($file) {
        return self::generate($file);
    }
}
