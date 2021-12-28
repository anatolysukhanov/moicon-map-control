<?php

namespace app\config;


/**
 * The translations of the text used on the website.
 *
 * You can access a translation with:
 *   Javascript:  framework.html.translate('I have x apples', {count:10})
 *   Twig:        {{ 'I have x apples'|translate({'count':10}) }}  or  {{ translate('I have x apples', {'count':10}) }}
 *
 * You can set the locale with:
 *   Javascript:  framework.locale.set('en')
 *
 * Note that the locale will be saved in the browser, meaning that even after refreshing the page, the locale will remain the same.
 *
 * This data can be accessed in javascript and twig as: framework.translations
 */
abstract class translations
{
    public static function getDefaultLocale($projectRootDir, $environment)
    {
        return 'no';
    }

    public static function get($projectRootDir, $environment)
    {
        return [
            'en' => [
                '{{_param.amount}} Report(s)' => '{{_param.amount}} Report{% if _param.amount != 1 %}s{% endif %}',
            ],
            'no' => [
                '{{_param.amount}} Report(s)' => '{{_param.amount}} Avvik',

                'Reports' => 'Avvik',
                'Currently displayed on the map' => 'Vises på kartet',
                'Reported {{_param.date}}' => 'Rapportert {{_param.date}}',
                'Comments' => 'Kommentarer',
                'Show my current location' => 'Vis min lokasjon',
                'Current Location' => 'Nåværende lokasjon',
                'Admin' => 'Administrator',
                'Account' => 'Konto',
                'Profile Settings' => 'Profilinnstillinger',
                'Log Out' => 'Logg ut',
                'Add description (not required)' => 'Legg til beskrivelse (ikke obligatorisk)',
                'Select type' => 'Velg type avvik',
                'Edit' => 'Endre',
                'Delete' => 'Slett',
                'Start' => 'Start',
                'Cancel' => 'Avbryt',
                'Route active' => 'Aktiv rute',
                'Drive to {{_param.from}} (Start)' => 'Kjør til {{_param.from}} (start)',
                'Routes' => 'Ruter',
                'Map layers' => 'Kartinnstillinger',
                'Show on the map' => 'Vis på kartet',
                'Road names' => 'Veinavn',
                'Messages' => 'Meldinger',
                'Message' => 'Melding',
                'Other trucks' => 'Andre biler',
                'Leave note' => 'Melding til kart',
                'Show more' => 'Vis mer',
                'Add new route' => 'Legg til ny rute',
                'Go back' => 'Gå tilbake',
                'Report problem' => 'Lag avvik',
                'Photo is OK' => 'Bilde er riktig',
                'Retake' => 'Ta på nytt',
                'Route undefined' => 'Udefinert',
                'Driver' => 'Renovatør',
                'Add Note' => 'Send melding',
                'Notes' => 'Meldinger',
                'Latitude' => 'Breddegrad',
                'Longitude' => 'Lengdegrad',
                'Address' => 'Adresse',
                'Description' => 'Melding',
                'Expire Date' => 'Utløper',
                'Save' => 'Send',
                'Enter your address' => 'Skriv adressen her …',
                'points' => 'hentepunkter',
                'Route history' => 'Vis historikk',
                'Date' => 'Dato',
                'Total time' => 'Total tid',
                'Driver name' => 'Rute ID',
                'Are you sure you want to enter Record mode?' => 'Er du sikker på at du ønsker å ta opp ruten?',
                'Yes' => 'Ja',
                'No' => 'Nei',
                'Quit' => 'Avslutt',
                'Percentage' => 'Progresjon',
                'OK' => 'OK',
                'Add report' => 'Send avvik',

                // placeholders
                'Describe situation briefly here...' => 'Beskriv situasjonen her...',
                'Leave message here' => 'Legg igjen beskjed her',
                'Search' => 'Søk',

                // date/time
                'Today' => 'I dag',
                'Yesterday' => 'I går',

                // REPORT_TYPES
                'Incorrectly Sorted Trash' => 'Feilsortert',
                'Damaged Bin' => 'Ødelagt beholder',
                'Not Accessible Bin' => 'Utilgjengelig beholder',
                'Other' => 'Annet',
            ],
        ];
    }
}
