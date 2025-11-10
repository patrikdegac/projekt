<?php
header('Content-Type: application/json; charset=utf-8');
$to = 'you@example.com'; // <-- promijeni na svoj email
$subject = 'AutoPulse kontakt forma';
function field($n){ return isset($_POST[$n]) ? trim($_POST[$n]) : ''; }
$ime = field('ime'); $prezime = field('prezime'); $email = field('email');
$drzava = field('drzava'); $newsletter = isset($_POST['newsletter']) ? 'DA' : 'NE'; $poruka = field('poruka');
if(!$ime || !$prezime || !$email || !$drzava || !$poruka){
  echo json_encode(['ok'=>false,'message'=>'Molimo ispunite sva obavezna polja.']); exit;
}
$body = "Nova poruka:\nIme: $ime\nPrezime: $prezime\nEmail: $email\nDržava: $drzava\nNewsletter: $newsletter\n\nPoruka:\n$poruka\n";
$headers = "From: AutoPulse <no-reply@domain.tld>\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();
$sent = @mail($to, $subject, $body, $headers);
if(!$sent){
  $log = __DIR__ . '/messages.log';
  file_put_contents($log, "----\n" . date('c') . "\n" . $body, FILE_APPEND);
  echo json_encode(['ok'=>true,'message'=>'Poruka zaprimljena (zapisano u log).']);
} else { echo json_encode(['ok'=>true,'message'=>'Hvala! Vaša poruka je poslana.']); }
