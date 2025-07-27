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
      
        $limit = isset($postjson['limit']) ? (int)$postjson['limit'] : 10;
        $start = isset($postjson['start']) ? (int)$postjson['start'] : 0;
        try {
            $sql = "SELECT * FROM pengumuman ORDER BY id DESC LIMIT $start, $limit";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $data = [];
            foreach ($rows as $row) {
                $data[] = array(
                    'judul' => $row['judul'],
                    'isi' => $row['isi'],
                    'tanggal' => $row['tanggal'],
                    
                );
            }

            $result = json_encode(array('success' => true, 'result' => $data));
            echo $result;
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    
      
   

?>
