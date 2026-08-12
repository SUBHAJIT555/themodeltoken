<?php


// --- CORS ---
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [

    'https://themodeltoken.com',
    'https://www.themodeltoken.com',
];
if ($origin && in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// --- Timezone ---
date_default_timezone_set('Asia/Kolkata');
mb_internal_encoding('UTF-8');
header('Content-Type: application/json; charset=utf-8');

// --- Autoload ---
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Helpers ---
function v(string $key, string $default = ''): string {
    return isset($_POST[$key]) ? trim((string)$_POST[$key]) : $default;
}
function clean(?string $s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}
function required(array $arr): ?string {
    foreach ($arr as $k => $label) {
        if (!isset($_POST[$k]) || trim((string)$_POST[$k]) === '') return "$label is required";
    }
    return null;
}

// --- Request validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST allowed.']);
    exit;
}

$formType = v('formType');
if ($formType !== 'callback') {
    http_response_code(400);
    echo json_encode(['error'=>'Invalid formType.']);
    exit;
}

// --- Field validation ---
if ($msg = required([
    'firstName'=>'First Name',
    'lastName'=>'Last Name',
    'email'=>'Email',
    'phone'=>'Phone',
])) { http_response_code(422); echo json_encode(['error'=>$msg]); exit; }

// --- Email validation ---
$email = v('email');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error'=>'Invalid email.']);
    exit;
}

$firstName = v('firstName');
$lastName  = v('lastName');
$phone     = v('phone');
$fullName  = trim($firstName . ' ' . $lastName);

// --- SMTP CONFIG ---
$smtpHost   = 'uk702.cloudwebhosting.com';
$smtpUser   = 'admin@megaversecircletech.com';
$smtpPass   = 'E1sGmR5hKFsC8B03';
$smtpPort   = 465;
$smtpSecure = 'smtps';

$toAddresses = [['aditya@baharnani.com','The Model Token']];
$fromEmail = $smtpUser;
$fromName  = 'The Model Token Website';

// --- Brand styling ---
$brandName = 'The Model Token';
$tagline   = 'The unified LLM API gateway.';
$brandColor = '#0a2540';
$muted = '#6b7280';
$bg = '#f9fafb';
$cardBg = '#ffffff';
$border = '#e5e7eb';

// --- Subject ---
$subject = "New Callback Request - " . $fullName;

// --- Dynamic content ---
$mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid '.$border.';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">Callback Request</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
            <p><strong>Name:</strong> '.clean($fullName).'</p>
            <p><strong>Email:</strong> '.clean($email).'</p>
            <p><strong>Phone:</strong> '.clean($phone).'</p>
          </td></tr>
        </table>
      </td>
    </tr>';


// --- HTML email template (Outlook-safe) ---
ob_start(); ?>
<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?= clean($subject) ?></title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      <o:AllowPNG/>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    body { margin:0; padding:0; background:#f9fafb; -webkit-text-size-adjust:none; text-size-adjust:none; }
    table, td { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; display:block; line-height:0; }
    @media (max-width:600px){ .stack-column { display:block!important; width:100%!important; } }
  </style>
</head>
<body style="margin:0;padding:0;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
      <td align="center" style="padding:30px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
          <tr>
            <td align="center" style="padding:30px 10px 20px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#0a2540;font-weight:700;"><?= clean($brandName) ?></h1>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;"><?= clean($tagline) ?></p>
            </td>
          </tr>
          <tr><td style="height:1px;background:#e5e7eb;"></td></tr>
          <tr>
            <td align="center" style="padding:20px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:#0a2540;"><?= clean($subject) ?></p>
              <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">Received at <?= date('Y-m-d H:i:s') ?> (server time)</p>
            </td>
          </tr>

          <?= $mainContent ?>

          <tr>
            <td align="center" style="padding:14px 20px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
              This email was generated from the <strong><?= clean($brandName) ?></strong> website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
<?php
$html = ob_get_clean();

// --- Alt text ---
$alt  = strip_tags($subject) . "\n\n";
$alt .= "Name: " . $fullName . "\n";
$alt .= "Email: " . $email . "\n";
$alt .= "Phone: " . $phone . "\n";

// --- Send Email ---
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom($fromEmail, $fromName);
    foreach ($toAddresses as [$addr, $nm]) $mail->addAddress($addr, $nm);
    $mail->addReplyTo($email, $fullName !== '' ? $fullName : $email);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $html;
    $mail->AltBody = $alt;
    $mail->send();

    echo json_encode(['success'=>true,'message'=>'Message sent.']);
} catch (Exception $e) {
    error_log('Mailer Error: '.$mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['error'=>'Failed to send email.']);
}
