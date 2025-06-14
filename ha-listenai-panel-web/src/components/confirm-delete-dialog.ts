import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { commonStyle } from '../styles';

export class ConfirmDeleteDialog extends LitElement {
  @property({ attribute: false }) public hass!: any;

  @state() private _params?: any;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.cancel();
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}>
          </ha-icon-button>
          <span slot="title">${this._params.title}</span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>
        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.cancel')}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} aria-label dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
  }

  confirmClick() {
    this._params.confirm();
  }

  cancelClick() {
    this._params.cancel();
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
const tag = 'confirm-delete-dialog';
if (!customElements.get(tag)) {
  customElements.define(tag, ConfirmDeleteDialog);
}