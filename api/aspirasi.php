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
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch ($aksi) {
    case "add_register":
        $nama = filter_var($postjson['nama'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $isi = filter_var($postjson['isi'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $waktu = filter_var($postjson['waktu'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

        try {
            $sql = "INSERT INTO aspirasi (nama, isi, waktu) VALUES (:nama, :isi, :waktu)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
            $stmt->bindParam(':isi', $isi, PDO::PARAM_STR);
            $stmt->bindParam(':waktu', $waktu, PDO::PARAM_STR);

            $stmt->execute();

            if ($stmt) $result = json_encode(array('success' => true, 'msg' => 'Aspirasi berhasil dikirim!'));
            else $result = json_encode(array('success' => false, 'msg' => 'Error, please try again'));

            echo $result;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        break;

     case "getdata":
         $limit = isset($postjson['limit']) ? (int)$postjson['limit'] : 10;
         $start = isset($postjson['start']) ? (int)$postjson['start'] : 0;
         try {
            $sql = "SELECT * FROM aspirasi  ORDER BY id DESC LIMIT $start, $limit";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $data = [];
            foreach ($rows as $row) {
                $data[] = array(
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'isi' => $row['isi'],
                    'waktu' => $row['waktu'],
                );
            }

            $result = json_encode(array('success' => true, 'result' => $data));
            echo $result;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;
      
   
}
?>
