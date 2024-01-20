<!--Um Lost Updates zu vermeiden verwende ich File locking -->
<?php
$file_path = 'register_data.json';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $vorname = $_POST['vorname'];
    $nachname = $_POST['nachname'];
    $email = $_POST['email'];
    $passwort = password_hash($_POST['passwort'], PASSWORD_DEFAULT); // pw hashen

    $new_user = [
        'vorname' => $vorname,
        'nachname' => $nachname,
        'email' => $email,
        'passwort' => $passwort
    ];

    // datei mit lock öffnen
    $file = fopen($file_path, 'c+');
    if (flock($file, LOCK_EX)) {
        
        $data = '';
        while (!feof($file)) {
            $data .= fread($file, 8192); //datei lesen
        }
        
        $users = $data ? json_decode($data, true) : [];

        // neuer nutzer rein
        $users[] = $new_user;

        // neue liste schreiben
        ftruncate($file, 0);
        rewind($file);
        fwrite($file, json_encode($users, JSON_PRETTY_PRINT));
        fflush($file); // flushen und schreiben
        flock($file, LOCK_UN); //freigeben
    }

    fclose($file);
    echo "Registrierung erfolgreich!";
}
?>
