import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { VMessageComponent } from 'src/shared/directives/vmessage/vmessage.component';
import { VMessageModule } from 'src/shared/directives/vmessage/vmessage.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, VMessageComponent],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
