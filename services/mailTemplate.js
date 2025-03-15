exports.forgetPasswordTemplate = (name,password) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Password Reset</title>
    <style>
        @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
            background-color: #F2F4F6;
            color: #51545E;
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }
        a { color: #3869D4; }
        .preheader {
            display: none !important;
            visibility: hidden;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
        }
        .button {
            background-color: #22BC66;
            border: 10px solid #22BC66;
            display: inline-block;
            color: #FFF;
            text-decoration: none;
            border-radius: 3px;
            padding: 10px 18px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
        }
        .email-wrapper {
            width: 100%;
            padding: 0;
            background-color: #F2F4F6;
        }
        .email-content {
            width: 100%;
            padding: 0;
        }
        .email-masthead {
            padding: 25px 0;
            text-align: center;
        }
        .email-body {
            width: 100%;
            padding: 0;
        }
        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            background-color: #FFFFFF;
        }
        .content-cell {
            padding: 45px;
        }
        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            text-align: center;
        }
        .email-footer p { color: #A8AAAF; }
        @media only screen and (max-width: 600px) {
            .email-body_inner, .email-footer { width: 100% !important; }
        }
    </style>
</head>
<body>
    <span class="preheader">Use this link to reset your password. The link is valid for 24 hours.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="email-masthead">
                            <a href="https://example.com" class="email-masthead_name">Dream Art</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body" width="570">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-cell">
                                        <h1>Hi ${name},</h1>
                                        <p>You recently requested to reset your password. Use the button below to proceed. <strong>This reset link is valid for 24 hours.</strong></p>
                                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a class="button">${password}</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p>If you did not request a password reset, please ignore this email or <a href="{{support_url}}">contact support</a> for help.</p>
                                        <p>Thanks,<br>The Dream Art Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="email-footer" align="center" width="570">
                                <tr>
                                    <td class="content-cell" align="center">
                                        <p class="sub"><b>Dream Art</b></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
}