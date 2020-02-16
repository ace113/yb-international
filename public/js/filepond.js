FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageValidateSize
)

FilePond.setOptions({
    stylePanelAspectRatio: 100/100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 100,
    imageValidateSizeMaxHeight: 65535
})

FilePond.parse(document.body);

