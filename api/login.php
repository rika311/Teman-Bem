<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');


include "db_config.php";

// Tambahkan ini untuk membaca JSON body
$postjson = json_decode(file_get_contents('php://input'), true);

// Cegah error jika $postjson null
// if (!is_array($postjson)) {
//     echo json_encode(['success' => false, 'message' => 'Request body tidak valid atau kosong']);
//     exit;
// }

$email = isset($postjson['email']) ? htmlspecialchars($postjson['email']) : '';
$password = isset($postjson['password']) ? htmlspecialchars($postjson['password']) : '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email dan password wajib diisi']);
    exit;
}

$sql = "SELECT * FROM users WHERE email = :email and password = :password";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$data = [];
foreach ($rows as $row) {
    $data[] = array(
        'name' => $row['name'],
        'email' => $row['email'],
        // 'password' => $row['password'],
    );
}
if ($stmt) $result = json_encode(array('success' => true, 'result' => $data));
else $result = json_encode(array('success' => false));
echo $result;



?>
