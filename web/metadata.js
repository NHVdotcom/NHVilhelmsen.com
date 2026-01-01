/**
 * Metadata Loader
 * Extracts EXIF data from gallery images and appends to figcaptions
 */
window.addEventListener("load", function() {
    console.log("Metadata script initialized...");
    const galleryImages = document.querySelectorAll("#gallery img");

    if (galleryImages.length === 0) {
        console.error("No images found in #gallery section!");
    }

    galleryImages.forEach(function(img) {
        if (typeof EXIF !== "undefined") {
            EXIF.getData(img, function() {
                const allMetaData = EXIF.getAllTags(this);
                console.log("Data found for " + img.src, allMetaData);

                const model = EXIF.getTag(this, "Model");
                const dateTaken = EXIF.getTag(this, "DateTimeOriginal");

                if (model || dateTaken) {
                    const caption = img.closest("figure").querySelector("figcaption");
                    if (caption) {
                        const metaContainer = document.createElement("div");
                        metaContainer.className = "image-meta";
                        let displayDate = dateTaken ? dateTaken.split(" ")[0].replace(/:/g, "-") : "";
                        metaContainer.innerText = `${model || ""} ${displayDate ? "• " + displayDate : ""}`;
                        caption.appendChild(metaContainer);
                    }
                }
            });
        } else {
            console.error("EXIF library not loaded!");
        }
    });
});