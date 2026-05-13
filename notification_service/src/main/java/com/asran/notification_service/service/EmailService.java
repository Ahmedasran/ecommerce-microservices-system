package com.asran.notification_service.service;

import jakarta.mail.internet.MimeMessage;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendWelcomeEmail(
            String to,
            String name
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true,
                            "UTF-8"
                    );

            helper.setTo(to);

            helper.setSubject(
                    "Welcome To AsRaN Store 🚀"
            );

            String html = """

                    <html>

                    <body style="
                        margin:0;
                        padding:0;
                        background:#f3f4f6;
                        font-family:Arial;
                    ">

                        <div style="
                            max-width:600px;
                            margin:40px auto;
                            background:white;
                            border-radius:20px;
                            overflow:hidden;
                            box-shadow:0 10px 30px rgba(0,0,0,0.1);
                        ">

                            <div style="
                                background:black;
                                padding:40px;
                                text-align:center;
                                color:white;
                            ">

                                <h1 style="
                                    margin:0;
                                    font-size:40px;
                                ">
                                    AsRaN Store
                                </h1>

                                <p style="
                                    margin-top:10px;
                                    font-size:18px;
                                    color:#d1d5db;
                                ">
                                    Welcome To The Future
                                </p>

                            </div>


                            <div style="
                                padding:50px;
                                text-align:center;
                            ">

                                <img
                                    src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png'
                                    width='120'
                                />

                                <h2 style="
                                    margin-top:30px;
                                    font-size:32px;
                                    color:#111827;
                                ">
                                    Hello """ + name + """
                                </h2>

                                <p style="
                                    font-size:18px;
                                    color:#6b7280;
                                    line-height:1.8;
                                ">
                                    Your account has been created successfully.
                                    <br/>
                                    Start shopping now and enjoy your experience.
                                </p>

                                <a href='http://localhost:5173/products'
                                   style='
                                        display:inline-block;
                                        margin-top:30px;
                                        background:black;
                                        color:white;
                                        padding:16px 40px;
                                        border-radius:12px;
                                        text-decoration:none;
                                        font-size:18px;
                                        font-weight:bold;
                                   '>

                                    Explore Products

                                </a>

                            </div>


                            <div style="
                                background:#111827;
                                padding:25px;
                                text-align:center;
                                color:#9ca3af;
                                font-size:14px;
                            ">

                                © 2026 AsRaN Store - All Rights Reserved

                            </div>

                        </div>

                    </body>

                    </html>

                    """;

            helper.setText(
                    html,
                    true
            );

            mailSender.send(message);

            System.out.println(
                    "EMAIL SENT TO : " + to
            );

        } catch (Exception e){

            e.printStackTrace();

        }
    }
    public void sendOrderConfirmedEmail(
            String to,
            String name,
            Long orderId,
            String skuCode
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true,
                            "UTF-8"
                    );

            helper.setTo(to);

            helper.setSubject(
                    "Order Confirmed ✅"
            );

            String html = """

                <html>

                <body style="
                    font-family:Arial;
                    background:#f3f4f6;
                    padding:40px;
                ">

                    <div style="
                        max-width:600px;
                        margin:auto;
                        background:white;
                        border-radius:20px;
                        padding:40px;
                        text-align:center;
                    ">

                        <h1 style="
                            color:#10b981;
                        ">
                            Order Confirmed ✅
                        </h1>

                        <h2>
                            Hello """ + name + """
                        </h2>

                        <p style="
                            font-size:18px;
                            color:#6b7280;
                        ">

                            Your order has been confirmed successfully.

                        </p>

                        <div style="
                            margin-top:30px;
                            padding:20px;
                            background:#f9fafb;
                            border-radius:12px;
                        ">

                            <p>
                                <b>Order ID:</b>
                                """ + orderId + """
                            </p>

                            <p>
                                <b>Product:</b>
                                """ + skuCode + """
                            </p>

                        </div>

                    </div>

                </body>

                </html>

                """;

            helper.setText(
                    html,
                    true
            );

            mailSender.send(message);

            System.out.println(
                    "ORDER EMAIL SENT TO : " + to
            );

        } catch (Exception e){

            e.printStackTrace();

        }
    }
}