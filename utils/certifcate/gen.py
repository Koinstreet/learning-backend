import sys
import textwrap
from datetime import datetime

from PIL import ImageFont, ImageDraw, Image

relativePath = "./utils/certifcate/Red_Hat_Display/static"
regular_fontpath = relativePath + "/RedHatDisplay-Regular.ttf"
bold_fontpath = relativePath + "/RedHatDisplay-Bold.ttf"
semi_bold_fontpath = relativePath + "/RedHatDisplay-SemiBold.ttf"

# fontRegular = ImageFont.load_default()
fontRegular = ImageFont.truetype(regular_fontpath, 50)
fontBold = ImageFont.truetype(bold_fontpath, 80)
fontSemiBold = ImageFont.truetype(semi_bold_fontpath, 80)


def put_text(img, full_name, course_name, description, img_size):

    global font, fontBold

    # Cadidate name
    wrapped_username = textwrap.wrap(full_name, width=30)
    x, _ = img_size

    x_name = 1000 - (len(full_name) * 30 / 2)
    y_name = 400 if len(wrapped_username) > 1 else 450

    for i, line in enumerate(wrapped_username):
        y = y_name + i * 30

        img.text((x_name, y), line.center(80), font=fontBold, fill=(0, 0, 0, 0))
        x_name += int(len(line)) * 4

    # Course Name
    img.text(
        ((1500 - (len(course_name) * 30 / 2)), 680),
        course_name,
        font=fontSemiBold,
        fill=(0, 0, 0, 0),
    )

    x_description = 750
    y_description = 800
    wrapped_description = textwrap.wrap(description, width=70)

    for i, line in enumerate(wrapped_description):
        y = y_description + i * 50

        img.text(
            (x_description if len(line) > 50 else x - (x * 2.5 / 4), y),
            line.center(80),
            font=fontRegular,
            fill=(0, 0, 0, 0),
        )

    # Course name and number
    img.text(
        (959, 1262),
        course_name_number,
        font=ImageFont.truetype(regular_fontpath, 25),
        fill=(0, 0, 0, 0),
    )
    # Date
    date = datetime.today().strftime("%Y-%m-%d")
    img.text(
        (950, 1300),
        date,
        font=ImageFont.truetype(regular_fontpath, 25),
        fill=(0, 0, 0, 0),
    )


if __name__ == "__main__":

    description = ""
    name = ""
    course_name = ""
    course_number = ""
    course_name_number = ""

    try:
        description = sys.argv[1]
        name = sys.argv[2]
        course_name = sys.argv[3]
        course_number = sys.argv[4]
        course_name_number = course_name + " " + course_number

    except:
        print("Less than 4 args provided")
        exit()

    # description = " desctiption of course Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
    # name = "Weber Xxxxx Xxxxxxxxxx Dubois"
    # course_name = "NFT Minting"
    # course_number = "101"
    # course_name_number = course_name + " " + course_number

    image = Image.open("./utils/certifcate/certificate.png")
    draw = ImageDraw.Draw(image)

    put_text(draw, name, course_name, description, image.size)
    path = "./utils/certifcate/images/"
    image.save(path + name.replace(" ", "_") + ".png", "PNG")
