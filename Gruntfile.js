module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    svgstore: {
      options: {
        prefix: "shape-", // This will prefix each <g> ID
      },
      default: {
        files: {
          "public/svg-defs.svg": ["public/*.svg"],
        },
      },
    },
  });

  // Load the plugin that provides the "svg-store" task.
  grunt.loadNpmTasks("grunt-svgstore");

  // Default task(s).
  grunt.registerTask("default", ["svgstore"]);
};
