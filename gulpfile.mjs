import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';

const sassCompiler = gulpSass(sass);

const styles = () => {
    return gulp.src('src/styles.scss') 
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(gulp.dest('css'));
};

const watchFiles = () => {
    gulp.watch('src/styles.scss', styles);
};

export { styles, watchFiles };

export default gulp.series(styles, watchFiles);