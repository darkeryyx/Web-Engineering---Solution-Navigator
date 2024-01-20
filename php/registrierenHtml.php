<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Übung 12.1: Registrierung mit PHP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
        }

        label {
            display: block;
            margin-top: 10px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }

        input[type="submit"] {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            background-color: #BA1EFF;
            color: white;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #8816BA;
        }
    </style>
</head>
<body>
    <form action="registrieren.php" method="post">
        <h2>Registrieren</h2>
        <label for="vorname">Vorname:</label>
        <input type="text" id="vorname" name="vorname" required>

        <label for="nachname">Nachname:</label>
        <input type="text" id="nachname" name="nachname" required>

        <label for="email">E-Mail:</label>
        <input type="email" id="email" name="email" required>

        <label for="passwort">Passwort:</label>
        <input type="password" id="passwort" name="passwort" required>

        <input type="submit" value="Registrieren">
    </form>
</body>
</html>
