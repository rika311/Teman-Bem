<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');
include "db_config.php";

// Ambil dan decode JSON body
$postjson = json_decode(file_get_contents('php://input'), true);
// Cegah error jika $postjson null
if (!is_array($postjson)) {
    echo json_encode(['success' => false, 'message' => 'Request body tidak valid atau kosong']);
    exit;
}

        $name = filter_var($postjson['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $email = filter_var($postjson['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $password = filter_var($postjson['password'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        try {
            $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->execute();


            if ($stmt) $result = json_encode(array('success' => true));
            else $result = json_encode(array('success' => false, 'msg' => 'Error, please try again'));

            echo $result;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
   
?>
