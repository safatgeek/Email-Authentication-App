// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "emailauthentication-a51f0", // Replace with your Firebase Project ID
            clientEmail:
                "firebase-adminsdk-f89yb@emailauthentication-a51f0.iam.gserviceaccount.com", // Replace with your Firebase client email
            privateKey:
                "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCTPWZqxuo62DFh\nSwYUz+JUlcJzMvyQuVUxOJrvSPSlaWLRL3VsqRBBNfrrZYRjCbN8G6pQAY4nm2PJ\na4Xzm1cyfFk3nxUoBIfFrMMNLby2It0QPAupH2QPSMSOL0r9lJRGLItPWDA3s5yG\nFBvSijE9XApPr3lN+VmMuXXHDiJbFB/MFUjUS1/UBmBPFyD3iYxRrHZowhtPyzBj\nFX+p5C8UfNMFKlSb1lDu5MC5S1wfVMEcxHMFeRCZ6FW3JLwPTke17wPzy7m9vZZ7\nO3vQaSLnM2KQizs4YWAzEaqh/3LtIfaPWAXdU7igZ7rIuCHl823lJVukl/yrp+0n\nhJsR2tNTAgMBAAECggEABX2YVAM8B0WBRJDBwWi0CICQR6F2VPiZoXXsI9G8UG5V\nhOgfmWrxbQJwa4E5SgtIAvAAR1JiMT5bns5yNqXrhitvXEW8u+WgPaBLhjJlbiBu\n6wvz888fTmzTeHeqWFaq131K3C1gCnyZm4iWbsuVj5c0SeX6smGRBaXXDtmLTcOr\n8uoST0OVq7IdGRZLu+dTMB1Bo81rUTAYP9MIKBbFAmV8t/6wJhZPsICttfmxwidh\n2ume3G0mntk4rEqY+KVP5cxcn812MFvZVv7zvEhBT/GwRpI8l0N/Kx8D8jlFjNsV\nRx2d9COgvKiJuCRMzWaSoaK2eazHnFH3UwtLpADJYQKBgQDPnl7xkFxLO1DaAbiy\nwc230S6xu8HGEf3QYW/6pA8tJduaqlpP914HaQ4cuvJdJD1EwJC2E/fRPeyIWfBF\nB/hVIQmZKCCey8kxMftwdGkKhBGn/+v0/FLJBctX95rPG3EsaIwMjBpK7hkKXnSI\nXD3lGasschQSHyaZiZ1rIoDoowKBgQC1jReAzgS/W6N1jlHhDewQboVKH1wp81bb\nEvuFsmNanZrsSjUoX94v1Ov/xLod1BYZjIwaEuVcgOJZ69X/nzHzDBlXUWQ/c8Wv\nWYmYm+828SmY1MXpF+igGPIDt2fvJSJWZHWp0zq1yyC70ehMLndv152aFZPJAaNQ\nmepxu+KlkQKBgQCu8B3F40KxLVCp8Otky8IAEaULo03aDEzWKVPGWDhlbVHF16Zz\nXNaA3fdDJA6VhrSNWshUcyzLxSapmUbHk7ieWlERGOurgcCL0DayAZSEhNWvvgde\njMFgmp5FB+AMhG3u4kSnSeHZoxe8UexU/Yw1n1RJBfJ9dnv6wSbAH/mIiwKBgQCw\nlkDTHxBNFJREZp7LmaAQR3/MHf6mKzNDOQ5+94ld/UhQJsnXsI/L1H2MNMyW8NBi\nH2uyfMitFguUTSjETxLlhdIsNVWdxjz1FtEYKCwgM6gzKFosI/43oqvb44vrdyIU\nB/jOq09CvgXjygL5/oRbu8xmsDAj5jz0zBDWeVq1kQKBgQCeZwGtLVpvtMwBmIW4\nTPD5r8FRsDdVeDGTSDV5UNe9x9s/CvKogbE8fgz8RSr2pz65moKbbeUKG/JwAmi3\nh1t4KqEt9OQGBqvhkvGFgniT4Lfp3bVZbcbk4xf7MM1aUEfY9pxvTPtTzI5APqN1\nO3FAHF1uoR/zuC3JSIMG5JqeBg==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n')
        }),
    });

    console.log("Firebase Admin Initialized titi");
} else {
    console.log("Firebase Admin already present titi");
}

export const auth = admin.auth();