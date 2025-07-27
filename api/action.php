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
        $nim = filter_var($postjson['nim'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $stambuk = filter_var($postjson['stambuk'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $alamat = filter_var($postjson['alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $tempatlahir = filter_var($postjson['tempatlahir'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $tanggallahir = filter_var($postjson['tanggallahir'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $nohp = filter_var($postjson['nohp'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $email = filter_var($postjson['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $prodi = filter_var($postjson['prodi'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $IPK = filter_var($postjson['IPK'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $alasan = filter_var($postjson['alasan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $pengalaman = filter_var($postjson['pengalaman'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        try {
            $sql = "INSERT INTO Registrasi (nama, nim, stambuk, alamat, tempatlahir, tanggallahir, nohp, email, prodi, IPK, alasan, pengalaman) VALUES (:nama, :nim, :stambuk, :alamat, :tempatlahir, :tanggallahir, :nohp, :email, :prodi, :IPK, :alasan, :pengalaman)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':nama', $nama, PDO::PARAM_STR);
            $stmt->bindParam(':nim', $nim, PDO::PARAM_STR);
            $stmt->bindParam(':stambuk', $stambuk, PDO::PARAM_STR);
            $stmt->bindParam(':alamat', $alamat, PDO::PARAM_STR);
            $stmt->bindParam(':tempatlahir', $tempatlahir, PDO::PARAM_STR);
            $stmt->bindParam(':tanggallahir', $tanggallahir, PDO::PARAM_STR);
            $stmt->bindParam(':nohp', $nohp, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':prodi', $prodi, PDO::PARAM_STR);
            $stmt->bindParam(':IPK', $IPK, PDO::PARAM_STR);
            $stmt->bindParam(':alasan', $alasan, PDO::PARAM_STR);
            $stmt->bindParam(':pengalaman', $pengalaman, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt) $result = json_encode(array('success' => true));
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
            $sql = "SELECT * FROM registrasi ORDER BY id DESC LIMIT $start, $limit";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $data = [];
            foreach ($rows as $row) {
                $data[] = array(
                    'id' => $row['id'],
                    'nama' => $row['nama'],
                    'nim' => $row['nim'],
                    'stambuk' => $row['stambuk'],
                    'alamat' => $row['alamat'],
                    'tempatlahir' => $row['tempatlahir'],
                    'tanggallahir' => $row['tanggallahir'],
                    'nohp' => $row['nohp'],
                    'email' => $row['email'],
                    'prodi' => $row['prodi'],
                    'IPK' => $row['IPK'],
                    'alasan' => $row['alasan'],
                    'pengalaman' => $row['pengalaman']
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
